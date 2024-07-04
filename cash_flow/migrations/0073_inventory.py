# Generated by Django 5.0.6 on 2024-05-30 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0072_cashflowentry_project_cashflowentry_uuid_project'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('quantity', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
