from django.shortcuts import render
import json
from django.http import HttpResponse
# Create your views here.
from roles.models import roles

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
