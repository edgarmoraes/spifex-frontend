# Generated by Django 5.0.3 on 2024-03-22 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0028_tabela_fluxo_uuid_conta_contabil'),
    ]

    operations = [
        migrations.AddField(
            model_name='tabelatemporaria',
            name='uuid_conta_contabil',
            field=models.UUIDField(blank=True, null=True),
        ),
    ]