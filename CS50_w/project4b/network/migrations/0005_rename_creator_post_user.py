# Generated by Django 4.1 on 2023-01-02 19:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_alter_post_creator'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='creator',
            new_name='user',
        ),
    ]
