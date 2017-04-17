
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
    genre    = SerializerMethodField()
    
    class Meta:
        model = Tracks
        fields = ['title','rating','genre']


    

    def get_genre(self, obj):
        g_qs = Genre.objects.filter_by_instance(obj)
        genres = GenreSerializer(g_qs, many=True).data
        return genres
    





