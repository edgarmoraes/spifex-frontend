# Generated by Django 5.0.1 on 2024-01-14 08:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0014_dataunica'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dataunica',
            old_name='data_formatada_fluxo',
            new_name='data_formatada',
        ),
    ]
