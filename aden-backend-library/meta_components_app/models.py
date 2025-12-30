from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Component(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='components'
    )
    
    category_choices = [
        ('form_controls', 'Form Controls'),
        ('navigation', 'Navigation'),
        ('media_interaction', 'Media & Interaction'),
        ('typography', 'Typography'),
        ('layout', 'Layout'),
        ('feedback_indicators', 'Feedback & Indicators'),
        ('styling_theming', 'Styling & Theming'),
    ]
    
    subcategory_choices = [
        ('autocomplete', 'Autocomplete'),
        ('checkbox', 'Checkbox'),
        ('input', 'Input'),
        ('radio', 'Radio'),
        ('range', 'Range'),
        ('slider', 'Slider'),
        ('formfield', 'Formfield'),
        ('button', 'Button'),
        
        ('menu', 'Menu'),
        ('tap', 'Tap'),
        
        ('drag_and_drop', 'Drag and Drop'),
        
        ('text_component', 'Text Component'),
        
        ('expansion_panel', 'Expansion-Panel'),
        ('grid', 'Grid'),
        ('scrollbar', 'Scrollbar'),
        
        ('dialog', 'Dialog'),
        ('tooltip', 'Tooltip'),
        ('progress', 'Progress'),
        ('snackbar', 'Snackbar'),
        ('badge', 'Badge'),
        ('confetti', 'Confetti'),
    ]
    
    title = models.CharField(max_length=200) 
    
    slug = models.SlugField(unique=True, max_length=100, blank=True) 
    
    likes_count = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=50, choices=category_choices, blank=True, null=True)
    subcategory = models.CharField(max_length=50, choices=subcategory_choices, blank=True, null=True)
    is_premium = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            
            while Component.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.slug


class ComponentLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='liked_components')
    component = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='likes')

    class Meta:
        unique_together = ('user', 'component')

    def __str__(self):
        return f"{self.user.email} likes {self.component.slug}"
   
    
class ComponentSave(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='saved_components_rel')
    component = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='saves')
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'component') # Ein User kann eine Component nur einmal speichern

    def __str__(self):
        return f"{self.user.email} saved {self.component.slug}"