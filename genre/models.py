from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse

class Genre(models.Model):
    name            = models.CharField(max_length=100)


    def __unicode__(self):
        return self.name