# Generated by Django 5.0.3 on 2024-04-08 23:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0054_rename_saldo_inicial_banks_initial_balance'),
    ]

    operations = [
        migrations.RenameField(
            model_name='banks',
            old_name='saldo_consolidado',
            new_name='consolidated_balance',
        ),
    ]
