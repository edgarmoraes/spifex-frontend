# Generated by Django 5.0.1 on 2024-01-16 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0018_bancos'),
    ]

    operations = [
        migrations.AddField(
            model_name='bancos',
            name='status',
            field=models.BooleanField(default=True),
        ),
    ]