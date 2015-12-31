from django.db import models

# Create your models here.
class script(models.Model) :
        name = models.CharField(max_length = 100,unique=True)  
        opter = models.CharField(max_length = 50, blank = True) 
        path =  models.CharField(max_length = 200, blank = True)
        date_time = models.DateTimeField(auto_now_add = True)
        content = models.TextField(blank = True, null = True)
        flag = models.CharField(max_length = 50, blank = True)
        class Meta:     
            db_table = 'script'
        def __unicode__(self) :
            return ('%s %s %s %s %s %s %s\n') % (self.id,self.name,self.opter,self.path,self.date_time,self.content,self.flag)



class script_info(models.Model) :
        script = models.ForeignKey(script)
        var_name = models.CharField(max_length = 100, blank = True)  
        iterm_Name = models.CharField(max_length = 200, blank = True)  
        content = models.TextField(blank = True, null = True)
        class Meta:     
            db_table = 'script_info'
        def __unicode__(self) :
            return ('%s %s %s %s %s\n') % (self.id,self.script,self.var_name,self.iterm_Name,self.content)