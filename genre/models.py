from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse

# Create your models here.

class GenreManager(models.Manager):
    def all(self):
        qs = super(GenreManager, self).filter(parent=None)
        return qs

    def filter_by_instance(self, instance):
        content_type = ContentType.objects.get_for_model(instance.__class__)
        obj_id = instance.id
        qs = super(GenreManager, self).filter(content_type=content_type, object_id= obj_id).filter(parent=None)
        return qs


class Genre(models.Model):
    name            = models.CharField(max_length=100)
    content_type    = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id       = models.PositiveIntegerField()
    content_object  = GenericForeignKey('content_type', 'object_id')
    parent          = models.ForeignKey("self", null=True, blank=True)


    objects = GenreManager()


    def __unicode__(self):
        return self.name


    def children(self): #replies
        return Genre.objects.filter(parent=self)

    @property
    def is_parent(self):
        if self.parent is not None:
            return False
        return True    