from django.shortcuts import render
import json
from django.http import HttpResponse
# Create your views here.
from roles.models import roles,keycode
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect

re_dict = {}

def index(request):
    opt = request.GET['opt']
    if opt == 'select':
        name = request.GET['name']
        roles_data = roles.objects.get(name = name)
        result = {}
        result['id'] = roles_data.id
        result['ip'] = roles_data.ip
        result['name'] = roles_data.name
        result['content'] = roles_data.content
        re_dict = {'result':result,
                   'code':200}
        return HttpResponse(json.dumps(re_dict))

        #re_dict = {'result':roles_data,
        #           'code':200}
        #return HttpResponse(json.dumps(re_dict))
    elif opt == 'update':
        pk = request.GET['pk']
        name = request.GET['name']
        ip = request.GET['ip']
        content = request.GET['content']
        roles.objects.filter(pk=pk).update(name = name,ip = ip,content = content)
        re_dict = {'result':'update ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'insert':
        name = request.GET['name']
        ip = request.GET['ip']
        content = request.GET['content']
        roles.objects.create(name=name, ip = ip,content = content)
        #DB = roles(name = name,ip = ip,content = content)
        #DB.save()
        re_dict = {'result':'insert ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'delete':
        name = request.GET['name']
        DB = roles.objects.get(name = name)
        DB.delete()
        re_dict = {'result':'delete ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'selectall':
        list = roles.objects.all()
        allresult = []
        for i in list:
            result = {}
            result['id'] = i.id
            result['ip'] = i.ip
            result['name'] = i.name
            result['content'] = i.content
            allresult.append(result)
        re_dict = {'result':allresult,
                   'code':200}
        return HttpResponse(json.dumps(re_dict))


@csrf_exempt
def format_request(request):
    if not request.POST and request.META['CONTENT_LENGTH']:
        server_json = request.META
        length = int(server_json['CONTENT_LENGTH'])
        postjson = json.loads(server_json['wsgi.input'].read(length))
    elif not request.POST:
        postjson = request.GET
    else:
        postjson = request.POST
    return postjson


@csrf_exempt
def keycheck(request):
    data = format_request(request)
    # server_json = request.META
    # length = int(server_json['CONTENT_LENGTH'])
    # postjson = json.loads(server_json['wsgi.input'].read(length))
    opt = data['opt']
    # if opt == 'select':
    #     name = request.GET['name']
    #     roles_data = roles.objects.get(name = name)
    #     result = {}
    #     result['id'] = roles_data.id
    #     result['ip'] = roles_data.ip
    #     result['name'] = roles_data.name
    #     result['content'] = roles_data.content
    #     re_dict = {'result':result,
    #                'code':200}
    #     return HttpResponse(json.dumps(re_dict))

    #     #re_dict = {'result':roles_data,
    #     #           'code':200}
    #     #return HttpResponse(json.dumps(re_dict))
    if opt == 'update':
        pk = data['pk']
        key = data['key']
        # ip = request.GET['ip']
        content = data['content']
        keycode.objects.filter(pk=pk).update(key = key,ip = ip,content = content)
        re_dict = {'result':'update ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'insert':
        key = data['key']
        # ip = request.GET['ip']
        content = data['content']
        keycode.objects.create(key = key,content = content)
        #DB = roles(name = name,ip = ip,content = content)
        #DB.save()
        re_dict = {'result':'insert ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'delete':
        pklist = data['pklist']
        allresult = []
        for pk in pklist:
            DB = keycode.objects.get(pk = pk)
            DB.delete()
            allresult.append(pk)
        re_dict = {'result':"delete ok",
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'selectall':
        list = keycode.objects.all()
        allresult = []
        for i in list:
            result = {}
            result['id'] = i.id
            # result['ip'] = i.ip
            result['key'] = i.key
            result['content'] = i.content
            allresult.append(result)
        re_dict = {'result':allresult,
                   'code':200}
        return HttpResponse(json.dumps(re_dict))