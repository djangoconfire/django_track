
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField
)

from .models import Tracks,Genre


class TrackSerializer(ModelSerializer):
    class Meta:
        model = Tracks
        fields = '__all__'



class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'



