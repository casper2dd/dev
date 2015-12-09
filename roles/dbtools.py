from roles.models import roles

def select(table,name):
    return table.objects.get(name = name)

def selectall(table):
    return table.objects.all()

def update(table,pk,name,ip,content):
    table.objects.filter(id=pk).update(name = name,ip = ip,content = content)

def insert(tables,name,ip,content):
    DB = tables(name = name,ip = ip,content = content)
    DB.save()

def delete(table,name):
    DB = table.objects.get(name = name)
    DB.delete()
