# Generated by Django 5.0.3 on 2024-04-07 15:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0038_rename_parcela_atual_cashflowentry_current_installment_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cashflowentry',
            old_name='parcelas_total',
            new_name='total_installments',
        ),
        migrations.RenameField(
            model_name='tabelatemporaria',
            old_name='parcelas_total',
            new_name='total_installments',
        ),
    ]
