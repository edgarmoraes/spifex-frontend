# Generated by Django 5.0.3 on 2024-04-07 16:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0041_rename_data_criacao_cashflowentry_creation_date_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cashflowentry',
            old_name='uuid_correlacao',
            new_name='uuid_correlation',
        ),
    ]
