# Generated by Django 5.0.3 on 2024-04-07 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0044_rename_inicio_mes_months_list_cash_flow_start_of_month'),
    ]

    operations = [
        migrations.RenameField(
            model_name='months_list_cash_flow',
            old_name='fim_mes',
            new_name='end_of_month',
        ),
    ]