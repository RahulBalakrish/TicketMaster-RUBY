class CreateCancelTable < ActiveRecord::Migration[7.1]
  def change
    create_table :cancel_tables do |t|
      t.string :orderid

      t.timestamps
    end
  end
end
