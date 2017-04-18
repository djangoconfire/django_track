
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField
)

from .models import Tracks
from genre.models import Genre


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'



class TrackSerializer(ModelSerializer):
    
    class Meta:
        model = Tracks
        fields = ['title','rating']







