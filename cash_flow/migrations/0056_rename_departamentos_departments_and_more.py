# Generated by Django 5.0.3 on 2024-04-08 23:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0055_rename_saldo_consolidado_banks_consolidated_balance'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Departamentos',
            new_name='Departments',
        ),
        migrations.RenameField(
            model_name='departments',
            old_name='departamento',
            new_name='department',
        ),
    ]
