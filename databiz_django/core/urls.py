from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('magazine/', views.magazine_page, name='magazine'),
	path('podcast/', views.podcast_page, name='podcast'),
	path('api/magazines', views.api_magazines),
	path('api/podcasts', views.api_podcasts),
	path('api/events', views.api_events),
	path('api/testimonials', views.api_testimonials),
	path('api/join', views.api_join),
	path('api/contact', views.api_contact),
	path('api/slides/stream', views.slides_stream),
	path('api/slides/rotate', views.slides_rotate),
]
