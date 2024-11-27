class CreateTUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :t_users do |t|
      t.string :email
      t.string :password_digest
      t.boolean :fromGoogle

      t.timestamps
    end
  end
end
