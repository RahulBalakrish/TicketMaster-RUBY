class DropcolumnTUsersTable < ActiveRecord::Migration[7.1]
  def change
    remove_column :t_users, :fromGoogle, :boolean
  end
end
