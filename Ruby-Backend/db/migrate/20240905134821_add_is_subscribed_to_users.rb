class AddIsSubscribedToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :t_users, :isSubscribed, :boolean, default: false
  end
end
