# Generated by Django 5.0.3 on 2024-03-31 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cash_flow', '0029_tabelatemporaria_uuid_conta_contabil'),
    ]

    operations = [
        migrations.CreateModel(
            name='Departamentos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('departamento', models.CharField(max_length=256)),
                ('uuid_departamento', models.UUIDField(blank=True, null=True)),
            ],
        ),
    ]
