from django.contrib import admin
from .models import Magazine, Podcast, Event, Testimonial, Submission

admin.site.register(Magazine)
admin.site.register(Podcast)
admin.site.register(Event)
admin.site.register(Testimonial)
admin.site.register(Submission)

# Register your models here.
