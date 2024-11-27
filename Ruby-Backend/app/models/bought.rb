class Bought < ApplicationRecord
  belongs_to :t_user

  # Use serialize to handle JSON stored as text
  serialize :events, JSON
  serialize :attractions, JSON

  # Ensure events and attractions are always arrays
  before_save :ensure_json_structure

  private

  def ensure_json_structure
    self.events = [] if events.nil? || !events.is_a?(Array)
    self.attractions = [] if attractions.nil? || !attractions.is_a?(Array)
  end
end
