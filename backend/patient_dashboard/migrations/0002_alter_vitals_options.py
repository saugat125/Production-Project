# Generated by Django 5.2 on 2025-04-12 08:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patient_dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='vitals',
            options={'ordering': ['-date_time'], 'verbose_name': 'Vitals', 'verbose_name_plural': 'Vitals'},
        ),
    ]
