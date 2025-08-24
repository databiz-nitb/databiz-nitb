from django.db import models


class TimeStampedModel(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		abstract = True


class Magazine(TimeStampedModel):
	title = models.CharField(max_length=200)
	url = models.URLField(blank=True)
	cover = models.URLField(blank=True)
	date = models.DateField()

	def __str__(self) -> str:
		return self.title


class Podcast(TimeStampedModel):
	title = models.CharField(max_length=200)
	url = models.URLField(blank=True)
	date = models.DateField()

	def __str__(self) -> str:
		return self.title


class Event(TimeStampedModel):
	title = models.CharField(max_length=200)
	location = models.CharField(max_length=200)
	date = models.CharField(max_length=100)

	def __str__(self) -> str:
		return f"{self.title} @ {self.location}"


class Testimonial(TimeStampedModel):
	name = models.CharField(max_length=120)
	quote = models.TextField()

	def __str__(self) -> str:
		return self.name


class Submission(TimeStampedModel):
	SUBMISSION_TYPES = (
		('join', 'Join'),
		('contact', 'Contact'),
	)
	type = models.CharField(max_length=20, choices=SUBMISSION_TYPES)
	name = models.CharField(max_length=120, blank=True)
	email = models.EmailField()
	message = models.TextField(blank=True)

	def __str__(self) -> str:
		return f"{self.type} - {self.email}"
