from django.shortcuts import render
from django.http import JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import json
from .models import Magazine, Podcast, Event, Testimonial, Submission


def home(request):
	return render(request, 'index.html')


def magazine_page(request):
	return render(request, 'magazine.html')


def podcast_page(request):
	return render(request, 'podcast.html')


def api_magazines(request):
	data = list(Magazine.objects.values('id', 'title', 'url', 'cover', 'date').order_by('-date'))
	return JsonResponse(data, safe=False)


def api_podcasts(request):
	data = list(Podcast.objects.values('id', 'title', 'url', 'date').order_by('-date'))
	return JsonResponse(data, safe=False)


def api_events(request):
	data = list(Event.objects.values('id', 'title', 'location', 'date').order_by('created_at'))
	return JsonResponse(data, safe=False)


def api_testimonials(request):
	data = list(Testimonial.objects.values('id', 'name', 'quote').order_by('-created_at'))
	return JsonResponse(data, safe=False)


@csrf_exempt
def api_join(request):
	if request.method != 'POST':
		return JsonResponse({'error': 'POST required'}, status=405)
	body = json.loads(request.body or '{}')
	name = body.get('name') or ''
	email = body.get('email')
	message = body.get('message') or ''
	if not name or not email:
		return JsonResponse({'error': 'name and email required'}, status=400)
	Submission.objects.create(type='join', name=name, email=email, message=message)
	return JsonResponse({'ok': True})


@csrf_exempt
def api_contact(request):
	if request.method != 'POST':
		return JsonResponse({'error': 'POST required'}, status=405)
	body = json.loads(request.body or '{}')
	name = body.get('name') or ''
	email = body.get('email')
	message = body.get('message') or ''
	if not email or not message:
		return JsonResponse({'error': 'email and message required'}, status=400)
	Submission.objects.create(type='contact', name=name, email=email, message=message)
	return JsonResponse({'ok': True})


_slides = [
	{"id": "s1", "title": "Welcome to DataBiz", "link": "/"},
	{"id": "s2", "title": "Weekly Magazine Now Live", "link": "/magazine/"},
	{"id": "s3", "title": "Podcast Episode 1 Released", "link": "/podcast/"},
]


def slides_stream(request):
	def event_stream():
		yield f"data: {json.dumps({'slides': _slides})}\n\n"
	return StreamingHttpResponse(event_stream(), content_type='text/event-stream')


@csrf_exempt
def slides_rotate(request):
	global _slides
	if _slides:
		first = _slides.pop(0)
		_slides.append(first)
	return JsonResponse({'ok': True, 'slides': _slides})

# Create your views here.
