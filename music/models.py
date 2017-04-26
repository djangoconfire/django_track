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


class Music(models.Model):
    track       =models.ForeignKey(Tracks,null=False)
    genre       =models.ForeignKey(Genre,null=False) 

    class Meta:
    	ordering=['-track_id']     
    