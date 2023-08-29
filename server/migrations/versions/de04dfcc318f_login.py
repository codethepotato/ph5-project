"""login

Revision ID: de04dfcc318f
Revises: adc7caae2742
Create Date: 2023-08-28 10:16:01.603713

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'de04dfcc318f'
down_revision = 'adc7caae2742'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cats', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cats', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')
        batch_op.drop_column('username')

    # ### end Alembic commands ###