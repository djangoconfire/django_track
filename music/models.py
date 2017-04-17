from __future__ import unicode_literals

from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse

# Create your models here.


from genre.models import Genre

class Tracks(models.Model):
    title           = models.CharField(max_length=200)
    rating          = models.CharField(max_length=3,null=True,blank=True)     
    


    def __unicode__(self):
        return self.title


    
    @property
    def genres(self):
        instance = self
        qs = Genre.objects.filter_by_instance(instance)
        return qs

    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type    

# class Music(models.Model):
#     track       =models.ForeignKey(Tracks,null=False)
#     genre       =models.ForeignKey(Genre,null=False)        
    