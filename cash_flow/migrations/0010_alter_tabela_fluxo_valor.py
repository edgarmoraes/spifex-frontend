# Generated by Django 5.0.1 on 2024-01-10 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0009_alter_tabela_fluxo_valor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tabela_fluxo',
            name='valor',
            field=models.DecimalField(decimal_places=2, max_digits=13),
        ),
    ]