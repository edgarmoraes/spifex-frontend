# Generated by Django 5.0.6 on 2024-05-30 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0073_inventory'),
    ]

    operations = [
        migrations.RenameField(
            model_name='inventory',
            old_name='name',
            new_name='item',
        ),
        migrations.AddField(
            model_name='inventory',
            name='uuid_item',
            field=models.UUIDField(blank=True, null=True),
        ),
    ]
