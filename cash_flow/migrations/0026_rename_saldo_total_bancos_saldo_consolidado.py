# Generated by Django 5.0.1 on 2024-02-13 07:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0025_bancos_saldo_total'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bancos',
            old_name='saldo_total',
            new_name='saldo_consolidado',
        ),
    ]