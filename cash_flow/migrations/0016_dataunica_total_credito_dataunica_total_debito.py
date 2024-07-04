# Generated by Django 5.0.1 on 2024-01-14 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0015_rename_data_formatada_fluxo_dataunica_data_formatada'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataunica',
            name='total_credito',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=13),
        ),
        migrations.AddField(
            model_name='dataunica',
            name='total_debito',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=13),
        ),
    ]