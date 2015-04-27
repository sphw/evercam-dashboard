module CurrentCart
  extend ActiveSupport::Concern

  private

  def set_cart
    session[:cart] ||= Array.new
  end

  def calculate_total
    amounts = session[:cart].map { |item| item.price }
    @total = amounts.inject(0) {|sum, i|  sum + i }
  end 

  def plan_in_cart?
    session[:cart].detect {|i| i.type.eql?('plan') } ? true : false
  end

  def plan_in_cart
    session[:cart].detect {|i| i.type.eql?('plan') } 
  rescue
    nil
  end

  def purge_plan_from_cart
    session[:cart].delete_if {|item| item.type.eql?('plan') }
  end

  def add_ons_in_cart?
    session[:cart].detect {|i| i.type.eql?('add_on') } ? true : false
  rescue
    nil
  end

  def add_ons_in_cart
    cart = session[:cart]
    cart.delete_if { |item| item.type.eql?('plan') }
    cart
  end

  def empty_cart
    session.delete(:cart)
  end

  def add_ons_total_cost
  end

  def plan_cost  
  end
end