class AddUsername < ActiveRecord::Migration[7.1]
  def change
    change_table(:t_users, bulk: true) do |t|
      t.string :username
    end
  end
end
