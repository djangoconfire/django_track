
from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination,
    )



class TrackLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 10


class TrackPageNumberPagination(PageNumberPagination):
	page_size = 20