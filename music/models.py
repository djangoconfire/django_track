from __future__ import unicode_literals

from django.db import models

# Create your models here.



class Genre(models.Model):
    name            = models.CharField(max_length=100)


    def __unicode__(self):
        return self.name

class Tracks(models.Model):
    title           = models.CharField(max_length=200)
    rating          = models.CharField(max_length=3,null=True,blank=True)


    def __unicode__(self):
        return self.title

class Music(models.Model):
    track       =models.ForeignKey(Tracks,null=False)
    genre       =models.ForeignKey(Genre,null=False)        
    