# Generated by Django 5.0.3 on 2024-04-07 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0050_rename_saldo_atual_bancos_current_balance_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Bancos',
            new_name='Banks',
        ),
    ]
