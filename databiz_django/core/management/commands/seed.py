from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import Magazine, Podcast, Event, Testimonial


class Command(BaseCommand):
	help = "Seed initial data for DataBiz"

	def handle(self, *args, **options):
		if not Magazine.objects.exists():
			Magazine.objects.create(title='Week 1: Launch Issue', url='', cover='', date=timezone.now().date())
		if not Podcast.objects.exists():
			Podcast.objects.create(title='Episode 1: Data Meets Innovation', url='', date=timezone.now().date())
		if not Event.objects.exists():
			Event.objects.create(title='Kickoff Meetup', location='MANIT Bhopal', date='TBA')
		if not Testimonial.objects.exists():
			Testimonial.objects.create(name='Student Member', quote='DataBiz helped me learn by doing.')
		self.stdout.write(self.style.SUCCESS('Seeded data.'))
