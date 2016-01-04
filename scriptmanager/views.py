from django.shortcuts import render
import json
import os
from django.http import HttpResponse
from scriptmanager.models import script,script_info
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
import time
# Create your views here.

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
def script_manager(request):
    data = format_request(request)
    opt = data['opt']

    if opt == 'update':
        pk = data['pk']
        name = data['name']
        opter = data['opter']
        path = data['path']
        content = data['content']
        flag = data['flag']
        script.objects.filter(pk=pk).update(name = name,opter = opter,path = path,content = content,flag = flag)
        re_dict = {'result':'update ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'insert':
        name = data['name']
        opter = data['opter']
        path = data['path']
        content = data['content']
        flag = data['flag']
        date_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        script.objects.create(name = name,opter = opter,path = path,content = content,flag = flag,date_time = date_time)
        re_dict = {'result':'insert ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'delete':
        pk = data['pk']
        DB = script.objects.get(pk = pk)
        DB.delete()
        re_dict = {'result':"delete ok",
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'selectall':
        list = script.objects.all()
        allresult = []
        for i in list:
            result = {}
            result['id'] = i.id
            result['name'] = i.name
            result['opter'] = i.opter
            result['path'] = i.path
            result['content'] = i.content
            result['flag'] = i.flag
            result['date_time'] = i.date_time
            allresult.append(result)
        re_dict = {'result':allresult,
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'select':
        name = data['name']
        DB = script.objects.get(name = name)
        result = {}
        result['id'] = DB.id
        result['name'] = DB.name
        result['opter'] = DB.opter
        result['path'] = DB.path
        result['content'] = DB.content
        result['flag'] = DB.flag
        result['date_time'] = DB.date_time
        re_dict = {'result':result,
                   'code':200}
        return HttpResponse(json.dumps(re_dict))


@csrf_exempt
def scriptname2id(name):
    p = script.objects.get(name=name)
    return p.id


@csrf_exempt
def script_info_manager(request):
    data = format_request(request)
    opt = data['opt']
    info = data['info']
    sname = data['sname']
    sid = scriptname2id(sname)

    if opt == 'update':       
        for i in info:
            var_name = i['var_name']
            iterm_Name = i['iterm_Name']
            content = i['content']
            script_info.objects.filter(script = sid).update(var_name = var_name,iterm_Name = iterm_Name,content = content)
        re_dict = {'result':'update ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))

    elif opt == 'insert':
        for i in info:
            var_name = i['var_name']
            iterm_Name = i['iterm_Name']
            content = i['content']
            script_info.objects.create(script = sid,var_name = var_name,iterm_Name = iterm_Name,content = content)
        re_dict = {'result':'insert ok',
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'delete':
        for i in info:
            var_name = i['var_name']
            iterm_Name = i['iterm_Name']
            content = i['content']

            DB = script_info.objects.get(script = sid,var_name = var_name,iterm_Name = iterm_Name)
            DB.delete()
        re_dict = {'result':"delete ok",
                   'code':200}
        return HttpResponse(json.dumps(re_dict))
    elif opt == 'selectall':
        list = script_info.objects.all()
        allresult = []
        for i in list:
            result = {}
            result['id'] = i.id
            result['script'] = i.script
            result['var_name'] = i.var_name
            result['iterm_Name'] = i.iterm_Name
            result['content'] = i.content
            allresult.append(result)
        re_dict = {'result':allresult,
                   'code':200}
        return HttpResponse(json.dumps(re_dict))