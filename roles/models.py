from django.db import models

# Create your models here.
class roles(models.Model) :
        name = models.CharField(max_length = 100,unique=True)  
        ip = models.CharField(max_length = 50, blank = True)  
        date_time = models.DateTimeField(auto_now_add = True)
        content = models.TextField(blank = True, null = True)

        def __unicode__(self) :
            return ('%s %s %s %s %s\n') % (self.id,self.name,self.ip,self.date_time,self.content)
