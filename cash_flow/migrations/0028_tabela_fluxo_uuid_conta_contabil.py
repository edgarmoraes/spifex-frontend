# Generated by Django 5.0.3 on 2024-03-22 00:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0027_tabela_fluxo_uuid_correlacao'),
    ]

    operations = [
        migrations.AddField(
            model_name='tabela_fluxo',
            name='uuid_conta_contabil',
            field=models.UUIDField(blank=True, null=True),
        ),
    ]