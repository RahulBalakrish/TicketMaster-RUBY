class RenameOldColumnNameToNewColumnName < ActiveRecord::Migration[7.1]
  def change
    rename_column :t_users, :fee_applies_to, :username
  end
end
