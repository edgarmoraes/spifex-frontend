# Generated by Django 5.0.1 on 2024-01-10 07:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0005_alter_recebimentos_data_criacao'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='recebimentos',
            new_name='tabela_fluxo',
        ),
    ]
