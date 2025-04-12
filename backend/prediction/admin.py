from django.contrib import admin
from .models import Disease, Doctor, PredictionRecord

class DiseaseAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_specialization_display')
    
    def get_specialization_display(self, obj):
        return obj.get_specialization_display()
    get_specialization_display.short_description = 'Specialization'
    
admin.site.register(Disease, DiseaseAdmin)

admin.site.register(Doctor)

admin.site.register(PredictionRecord)
