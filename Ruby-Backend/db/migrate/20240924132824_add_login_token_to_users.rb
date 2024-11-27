class AddLoginTokenToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :t_users, :login_token, :string
  end
end
