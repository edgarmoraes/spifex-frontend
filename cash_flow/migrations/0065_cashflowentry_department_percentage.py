# Generated by Django 5.0.6 on 2024-05-16 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0064_alter_cashflowentry_department_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cashflowentry',
            name='department_percentage',
            field=models.JSONField(default=''),
            preserve_default=False,
        ),
    ]