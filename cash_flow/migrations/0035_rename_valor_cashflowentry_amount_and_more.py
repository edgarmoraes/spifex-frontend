# Generated by Django 5.0.3 on 2024-04-04 00:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0034_rename_observacao_cashflowentry_observation_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cashflowentry',
            old_name='valor',
            new_name='amount',
        ),
        migrations.RenameField(
            model_name='tabelatemporaria',
            old_name='valor',
            new_name='amount',
        ),
    ]
