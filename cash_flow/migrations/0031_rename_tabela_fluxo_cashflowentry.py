# Generated by Django 5.0.3 on 2024-04-03 22:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0030_departamentos'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='tabela_fluxo',
            new_name='CashFlowEntry',
        ),
    ]
