# Generated by Django 5.2 on 2025-05-07 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_user_age_alter_user_blood_group_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='registered_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
